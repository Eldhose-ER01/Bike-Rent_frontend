const Timecalculate = (picktime, pickupdate, dropdate, DropTime) => {
  const bookingData = {
    picktime: picktime,
    pickupdate: pickupdate,
    dropdate: dropdate,
    DropTime: DropTime,
  };
  const pickDateTime = new Date(
    `${bookingData.pickupdate} ${bookingData.picktime}`
  );
  const dropDateTime = new Date(
    `${bookingData.dropdate} ${bookingData.DropTime}`
  );

  // Calculate the difference in milliseconds
  const timeDifference = dropDateTime.getTime() - pickDateTime.getTime();

  // Convert the difference to total hours
  const totalHoursDifference = timeDifference / (1000 * 60 * 60);

  return totalHoursDifference;
};

export default Timecalculate;
