import Link from "next/link";

export default function SigninForm() {
    return (
        <form className="flex flex-col justify-center items-center gap-13 ">
            <div className="input input-lg w-full">
                <input type="email"
                placeholder="Enter your email" 
                />
            </div>

            <div className="input input-lg w-full">
                <Link href="/reset-password" 
                className="absolute text-[#5BB98B] text-[16px] right-2 bottom-13"
                >
                    Forgot password?
                </Link>
                <input type="password"
                placeholder="Enter your password" 
                />
            </div>

            <button 
            type="submit"
            className="btn btn-primary btn-lg w-full"
            >
                Sign in
            </button>
        </form>
    );
}