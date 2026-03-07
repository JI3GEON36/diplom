import { signIn, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { CircleUser, User } from "lucide-react"
import Link from "next/link"

interface Props {
onClickSingIn?:() => void
className?:string
}

const ProfileButton:React.FC<Props> = ({className, onClickSingIn}) => {
    const {data:session} = useSession()
    return (
        <div className={className}>
            {!session ?    
            <Button
            onClick={onClickSingIn}
            variant={'outline'} 
            className="flex items-center gap-1">
            <User size={16}/>
            Войти
             </Button>
             : 
             <Link href="/profile">
             <Button className="flex items-center gap-2" variant={"secondary"}>
                <CircleUser />
                Профиль
             </Button>
             </Link>}
        </div>
    )
}

export default ProfileButton