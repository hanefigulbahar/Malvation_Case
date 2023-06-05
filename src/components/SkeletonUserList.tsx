const Skeleton = () => {
  return (
    <table
      role="status"
      className=" animate-pulse w-full px-4 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="flex cursor-pointer items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center justify-center mt-4">
                  <svg
                    className="w-10 h-10 mr-2 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="pl-3">
                  <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
              </td>
              <td className="px-6 py-4">
                <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
              </td>
              <td className="px-6 py-4">
                <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
              </td>
              <td className="px-6 py-4">
                <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
              </td>
              <td className="px-8 py-4">
                <button className="text-xl text-red-500">
                  <div className="w-10 h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 mr-3"></div>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export { Skeleton };
