import React from 'react'
import Registration from '../services/Register'

const Register: React.FC = () => {

    const {
        name, setName, 
        email, setEmail, 
        password, setPassword,
        phoneNumber, setPhoneNumber,
        address, setAddress,
        city, setCity,
        country, setCountry,
        accountName, setAccountName,
        accountNumber, setAccountNumber,
        bankName, setBankName,
        
        handleSubmit } = Registration();

    return (
        <div>

            <section className="w-full">
                <div className="w-full h-[200px] bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">
                    {/* Photo by '@insolitus' on Unsplash */}
                    <div>
                        <h1 className="text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl :text-xl font-semibold p-2 bg-opacity-40 rounded-sm">
                            Welcome to Robernix Industries
                        </h1>
                    </div>
                    
                </div>
            </section>



            <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto">
                <div className="w-full max-w-3xl space-y-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://www.svgrepo.com/show/499664/user-happy.svg"
                            alt=""
                        />
                        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6" method="POST">

                            {/* Personal Information */}
                            <h1 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-20">
                                REGISTER HERE
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        name="username"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}   
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <input
                                        name="country"
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                
                            </div>

                            {/* Bank Details */}
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">
                                Bank Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Account Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Account Name
                                    </label>
                                    <input
                                        name="account_name"
                                        type="text"
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Account Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Account Number
                                    </label>
                                    <input
                                        name="account_number"
                                        type="text"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>

                                {/* Bank Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Bank Name
                                    </label>
                                    <input
                                        name="bank_name"
                                        type="text"
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                        required
                                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 
                  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent 
                bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 
                focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                                >
                                    Register Account
                                </button>
                            </div>

                                                </form>
                                                <div className="mt-4 text-center">
                                                    <span className="text-gray-700">Already have an account? </span>
                                                    <a href="/login" className="text-blue-600 hover:underline font-semibold">Login here</a>
                                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
