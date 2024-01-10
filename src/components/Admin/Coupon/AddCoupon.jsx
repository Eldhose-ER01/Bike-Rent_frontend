import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { AddCoupons } from '../../../configure/Admininterceptor';

const AddCoupon = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
  const navigate = useNavigate();
  const initailValues = { couponName: " ", maxPurchaseAmount: "",discountAmount:"",expirationDate:"",couponcode:"" }
  const [formvalues, setFormvalues] = useState(initailValues);

  const handlechange = (e) => {
    const { value, name } = e.target;

    const newValue = value.trim();
    console.log(newValue);
    setFormvalues({ ...formvalues, [name]: newValue });
  };

   const isWhiteSpace = (value) => {
    return !/\s/.test(value);
  };


  const returnpage = () => {
    navigate('/admin/coupon');
  };

  const handleSubmits =async () => {
  const response=await AddCoupons(formvalues)
  if(response.data.success){
    navigate('/admin/coupon')
    toast.success("coupon add success")
  }
  
  };

  return (
    <div>
     <div className="h-16 w-screen bg-green-400">
        <img
          src="../../../../public/Images/pngwing.com.png"
          className="w-14 h-14 pt-3 pl-3 "
          alt="image"
        onClick={returnpage}/>
      </div>
      <h1 className='text-center mt-10 font-extrabold text-2xl'>Create Coupon</h1>
    <div className="flex items-center justify-center  mt-10">
       
      <div className="w-full max-w-md p-6 border rounded-md bg-gray-200">
       
        <form>
          <div className="mb-4">
            <label htmlFor="couponName" className="block text-sm font-medium text-black">
              Coupon Name:
            </label>
            <input
            {...register('couponName', {
                required: 'Please fill the feild',
                validate: (value) => isWhiteSpace(value) || 'White spaces are not allowed',
              })}
              type="text"
              id="couponName"
              name="couponName"
              value={formvalues.couponName}
              onChange={handlechange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
              {errors.couponName && <span style={{ color: 'red' }}>{errors.couponName.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="maxPurchaseAmount" className="block text-sm font-medium text-black">
              Maximum Purchase Amount:
            </label>
            <input
             {...register("maxPurchaseAmount", { required: true })}
              type="text"
              id="maxPurchaseAmount"
              name="maxPurchaseAmount"
              value={formvalues.maxPurchaseAmount}
              onChange={handlechange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
             {errors.maxPurchaseAmount && (
                    <span style={{ color: "red" }}>Please fill feild</span>
                  )}
          </div>
          <div className="mb-4">
            <label htmlFor="discountAmount" className="block text-sm font-medium text-black">
              Discount Amount:
            </label>
            <input
             {...register("discountAmount", { required: true })}
              type="text"
              name="discountAmount"
              id="discountAmount"
              value={formvalues.discountAmount}
              onChange={handlechange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.discountAmount && (
                    <span style={{ color: "red" }}>Please fill feild</span>
                  )}
          </div>





          <div className="mb-4">

<label htmlFor="couponcode" className="block text-sm font-medium text-black">
  Coupon Code:
</label>
<input
 {...register("couponcode", { required: true })}
  type="test"
  name="couponcode"
  id="couponcode"
  value={formvalues.couponcode}
  onChange={handlechange}
  required
  className="mt-1 p-2 w-full border rounded-md"
 
/>
 {errors.couponcode && (
        <span style={{ color: "red" }}>Please fill feild</span>
      )}
</div>


          <div className="mb-4">

            <label htmlFor="expirationDate" className="block text-sm font-medium text-black">
              Expiration Date:
            </label>
            <input
             {...register("expirationDate", { required: true })}
              type="date"
              name="expirationDate"
              id="expirationDate"
              value={formvalues.expirationDate}
              onChange={handlechange}
              required
              className="mt-1 p-2 w-full border rounded-md"
              min={new Date().toISOString().split('T')[0]} 
            />
             {errors.expirationDate && (
                    <span style={{ color: "red" }}>Please fill feild</span>
                  )}
          </div>
          <button type="submit" className="w-full bg-green-400 text-white p-2 rounded-md"onClick={handleSubmit(handleSubmits)}>
            Create Coupon
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddCoupon;
