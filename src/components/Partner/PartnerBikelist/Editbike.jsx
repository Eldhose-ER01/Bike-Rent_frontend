

export default function Editbike() {
  return (
    <div>
          <div className={loader === false ? "bg-transparent w-full h-screen" : "sbg-transparent tracking-tight text-gray-900 dark:text-white opacity-30 w-full h-screen"}>
     <div className="container mx-auto mt-5">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-200 p-8 rounded custom-shadow">
          <h2 className="text-2xl font-semibold mb-6 bg-green-300 h-14 text-center flex justify-center items-center">Add Bike</h2>

          {/* Bike Name and Brand */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="Bikename" className="block text-sm font-medium text-black">
                Bike Name
              </label>
              <input
                type="text"
                id="Bikename"
                name="Bikename"
                value={bikeData.Bikename}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-black">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={bikeData.brand}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>

          {/* CC and Image */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="VehicleCC" className="block text-sm font-medium text-black">
                Vehicle CC
              </label>
              <input
                type="text"
                id="VehicleCC"
                name="VehicleCC"
                value={bikeData.VehicleCC}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                Image URL
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="border border-gray-400 py-1 px-2 w-full md:w-60 rounded-md"
                defaultValue={bikeData.image}
                onChange={imageUpload}
                accept="image/image"
              />
            </div>
          </div>

          {/* Rent */}
          <div className="mb-4">
            <label htmlFor="RentPerDay" className="block text-sm font-medium text-black">
              Rent Per Day
            </label>
            <input
              type="text"
              id="RentPerDay"
              name="RentPerDay"
              value={bikeData.RentPerDay}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Bike
            </button>
          </div>
        </form>
      </div>

      {/* Loader */}
      {loader === true && (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          {/* Loader SVG */}
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
    </div>
  )
}
