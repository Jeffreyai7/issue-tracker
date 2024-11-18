"use client"
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { SimpleMDEEditor } from '@/app/configuration';
import { Button, Callout, TextField, Text } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import axios from "axios"
import { useState } from 'react';
import {zodResolver} from "@hookform/resolvers/zod"
import { schema } from '@/app/validationschema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/spinner';
import { FaBullseye } from 'react-icons/fa6';

interface Issueform {
  title: string,
  description: string
}

const NewIssuePage = () => {

  const {register, handleSubmit, control, formState: {errors}} = useForm<Issueform>({resolver: zodResolver(schema)});
  const router = useRouter();
  const [error, setError] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try{
      setSubmitting(true)
      await axios.post("/api/issues", data );
      router.push("/issues")
    }catch(error){
      setSubmitting(false)
      setError("An unexpected error occured")
    }
  } )

  return (
    <div className='max-w-xl'>
      {
        error && (
          <Callout.Root color='red' className='mb-5'>
      <Callout.Text>
        {error}
      </Callout.Text>
      </Callout.Root>
        )
      }
    <form className='max-w-xl space-y-3 pl-3' onSubmit={onSubmit}>
        <TextField.Root placeholder='Title' {...register("title")}>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDEEditor placeholder="Reply to comment…" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} >Submit New Issue {isSubmitting && <Spinner/> } </Button>
    </form>
    </div>
  )
}

export default NewIssuePage