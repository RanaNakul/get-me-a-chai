


import React from "react";
import PaymentPage from "@/components/PaymentPage";

const Username = async ({ params }) => {
  const { username } = await  params;

  return (
    <>
         
          <PaymentPage username={username}/>
        
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `Support ${username} - Get Me a Chai`,
  }
}