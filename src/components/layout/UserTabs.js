import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs(props) {
    const {isAdmin}=props
    const path=usePathname()
  return (
    <div className="user-tabs flex gap-5 justify-center mt-8">
        {isAdmin? 
            <>
                <Link href="/profile" className={path==="/profile"?"active":""}>Profile</Link>
                <Link href="/categories" className={path==="/categories"?"active":""}>Categories</Link>
                <Link href="/products" className={path==="/products"?"active":""}>Products</Link>
                <Link href="/users" className={path==="/users"?"active":""}>User</Link>
            </>
            :
            <div className="text-2xl text-primary font-bold text-center">Profile</div>

        }
      
    </div>
  )
}
