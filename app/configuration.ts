"use client"
import dynamic from 'next/dynamic';


export const SimpleMDEEditor = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
  });
  