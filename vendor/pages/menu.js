//import clientPromise from "/lib/mongodb";
import AddRest from "/components/AddRest";
import EditMenu from "/components/EditMenu";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import {useEffect} from 'react'


export default function Menu(){

    return(
        <>
          <AddRest/>
          <EditMenu/>
        </>
    )
}