"use client";

export default function PayPalButton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-8 transform transition duration-300 hover:shadow-xl">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
          Support Our Mission with PayPal
        </h3>
        <div className="flex justify-center items-center">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=3P7G7PYAUF96N"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#0070ba] hover:bg-[#003087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070ba] transform transition-all duration-200 hover:scale-102 shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.315.844.825.983 1.39.297 1.22-.019 2.019-.816 3.247-.978 1.516-2.895 2.324-4.915 2.324h-.528c-.399 0-.735.29-.797.686l-.109.553-.633 4.01-.031.154c-.062.395-.398.686-.797.686H9.846c-.328 0-.558-.317-.457-.628l1.912-12.105c.061-.395.397-.686.796-.686h5.96c1.368 0 2.468.64 2.01 2.369zm2.99-.515c.452 2.998-2.188 6.477-6.72 6.477h-1.19l-.001.003-1.095 6.927c-.066.418-.422.724-.844.724H8.673c-.328 0-.558-.317-.457-.628l1.912-12.105c.061-.395.397-.686.796-.686h7.043c1.368 0 3.63.64 3.09 2.369v-.003.003zm-6.303-3.456l.136-.857c.072-.457.459-.793.92-.793h4.185c.327 0 .558.317.457.628l-.136.857c-.072.457-.459.793-.92.793h-4.185c-.328 0-.558-.317-.457-.628z"/>
            </svg>
            Donate Securely
          </a>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-3 sm:mt-4">
          Your donation helps us make a difference in Sierra Leone
        </p>
      </div>
    </div>
  );
}
