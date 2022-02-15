import { useEffect, useState } from "react";
import axios from "axios";

export const useGetData = () => {
  const [data, setData] = useState([]);

  function fetchData() {
    function getTenants() {
      return axios.get(`http://localhost:5083/Tenants`);
    }

    function getApartments() {
      return axios.get(`http://localhost:5083/Apartments`);
    }

    function getPayment() {
      return axios.get(`http://localhost:5083/Payment`);
    }

    Promise.all([getTenants(), getApartments(), getPayment()]).then(
      (results) => {
        const tenants = results[0].data; //id
        const apartments = results[1].data; //tenantsId
        const payments = results[2].data; //paymentId

        setData(getMergedData(tenants, apartments, payments));
      }
    );
  }

  function getMergedData(tenants, apartments, payments) {
    return tenants.map((tenant) => {
      const apartment = apartments.find((apartment) => {
        return tenant.id === apartment.tenantsId;
      });

      const payment = payments.find(
        (payment) => tenant.paymentId === payment.id
      );

      return {
        ...tenant,
        ...apartment,
        ...payment,
      };
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData];
};
