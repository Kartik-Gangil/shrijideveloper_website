'use client';
import Loader from "@/components/loader";
import { GalleryHorizontalEnd, LandmarkIcon, Pencil, Trash2, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../properties/component/Navbar";

export default function AdminPropertyDashboard() {

  const [dataFrame, setDataFrame] = useState({
    plot: [],
    PlotCount: 0,
    UsersCount: 0,
    totalValue: 0
  })
  const [loader, setLoader] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setLoader(true)
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log("Dashboard Data:", data);
      setDataFrame(data);
      setLoader(false)
    }
    catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleDelete = async (id: string) => {
    try {
      setLoader(true)
      const res = await fetch(`/api/dashboard?id=${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        fetchData();
      }
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }


  const router = useRouter();

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#F7F4F1] mt-15 p-6 lg:p-10">
        {loader && <Loader />}
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <h1 className="text-4xl lg:text-5xl font-bold">

                Admin Property Dashboard

              </h1>

              <p className="text-gray-600 mt-3">

                Manage and track your land listings across India
                with real-time status updates.

              </p>

            </div>

            <button className="bg-[#A86300] text-white px-8 py-5 rounded-2xl shadow-md font-semibold hover:cursor-pointer" onClick={() => router.push("/dashboard/addProperty")}>

              ＋ Add New Property

            </button>

          </div>


          {/* SEARCH */}

          <div className="bg-white rounded-3xl shadow-sm p-4 mt-10">

            <div className="flex flex-col lg:flex-row gap-4">

              <input
                placeholder="Search Listings by name, location, or RERA ID..."
                className="flex-1 border border-[#DDBEA2] rounded-2xl px-6 py-5 outline-none"
              />

              <button className="border border-[#DDBEA2] rounded-2xl px-10 py-5">

                Filter

              </button>

            </div>

          </div>


          {/* TABLE */}

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mt-8">

            <div className="hidden md:grid grid-cols-5 px-8 py-6 bg-[#FAF7F4] font-semibold">

              <div>PROPERTY NAME</div>

              <div>PRICE</div>

              <div>LOCATION</div>

              <div>STATUS</div>

              <div>ACTIONS</div>

            </div>

            {dataFrame.plot.map((item, index) => (

              <div
                key={index}
                className="grid md:grid-cols-5 gap-6 px-8 py-8 border-t items-center"
              >

                <div className="flex gap-4">

                  <Image
                    src={item.images[0]}
                    className="w-14 h-14 rounded-xl object-cover"
                    width={1000}
                    height={1000}
                    alt="image"
                  />

                  <div>

                    <h3 className="font-semibold">

                      {item.title}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {item.description}

                    </p>

                  </div>

                </div>

                <div>

                  {item.price}

                </div>

                <div>

                  📍 {item.address}

                </div>

                <div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm ${item.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"}

`}
                  >

                    ● {item.status}

                  </span>

                </div>

                <div className="flex gap-5 text-xl">

                  <button title="edit" className="cursor-pointer p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
                    onClick={() => router.push(`/dashboard/updateProperty/${item._id}/`)}>

                    <Pencil />

                  </button>

                  <button title="delete" className="cursor-pointer p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
                    onClick={() => handleDelete(item._id)}
                  >

                    <Trash2 />

                  </button>

                </div>

              </div>

            ))}

            {/* FOOTER */}

            <div className="flex flex-col lg:flex-row justify-between items-center px-8 py-6 border-t">

              <p className="text-sm text-gray-500">

                Showing {dataFrame.PlotCount} Properties

              </p>

              <div className="flex gap-3 mt-4 lg:mt-0">

              </div>

            </div>

          </div>


          {/* STATS */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "TOTAL PORTFOLIO",
                value: `${dataFrame.PlotCount} Plots`,
                Icon: GalleryHorizontalEnd,
              },
              {
                title: "ACTIVE ENQUIRIES",
                value: `${dataFrame.UsersCount} Leads`,
                Icon: TrendingUp,
              },
              {
                title: "VALUE LOCKED",
                value: `₹${dataFrame.totalValue.toLocaleString()}`,
                Icon: LandmarkIcon,
              },
            ].map((card, index) => {
              const IconComponent = card.Icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#F4EFE9] flex items-center justify-center">
                      <IconComponent size={24} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {card.title}
                      </p>

                      <h3 className="text-4xl font-bold mt-1">
                        {card.value}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>
    </>
  )

}