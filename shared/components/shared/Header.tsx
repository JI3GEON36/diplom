'use client'

import { cn } from "@/shared/lib/utils";
import React from "react";
import Container from "./container";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import { CartButton } from "./cart-button";
import ProfileButton from "./profile-button";
import AuthModal from "./modals/auth-modal/auth-modal";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    hasSearch?:boolean,
    hasCart?:boolean,
    className?: string
}

const Header:React.FC<Props> = ({className, hasSearch = true, hasCart = true}) => {

    const [openAuthModal, setOpenAuthModal] = React.useState(false)
    const searchParams = useSearchParams();

    React.useEffect(() => {
        if(searchParams.has('verified')) {
            setTimeout(() => {
               toast.success('Вход успешно подтверждён') 
            }, 500);
        }
    }, [])

    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">

                {/* ..левая часть */}
            <Link href={"/"}>
                <div className="flex items-center gap-4">
                <Image src="/logo.jpg" alt="Logo" width={90} height={90} />
                <div>
                    <h1 className="text-2xl uppercase font-black">Test</h1>
                    <p className="text-sm text-gray-400 leading-3">Test Desc</p>
                </div>
            </div>
            </Link>

             {hasSearch && <div className="mx-10 flex-1">
                    <SearchInput />
                </div>}

                {/* // правая часть */}
            <div className="flex items-center gap-3">
            
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

            <ProfileButton onClickSingIn={() => setOpenAuthModal(true)}/>

              {hasCart && 
              <div>
                   <CartButton />
              </div>}
                
            </div>
            </Container>
           
        </header>
    )
}

export default Header