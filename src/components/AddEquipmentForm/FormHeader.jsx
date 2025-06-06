const FormHeader = ({ title, subtitle }) => {
    return (
      <div className="bg-gradient-to-r from-rose-700 to-rose-500 p-5 sm:p-6 md:p-8 relative">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-rose-300 bg-opacity-20 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 rounded-full bg-white bg-opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-white bg-opacity-25 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 shadow-inner">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
              {title}
            </h1>
          </div>
          <p className="text-rose-100 text-sm sm:text-base max-w-md">
            {subtitle}
          </p>
        </div>
      </div>
    );
  };
  
  export default FormHeader;