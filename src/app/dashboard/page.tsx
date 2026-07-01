'use client';
import Loader from "@/components/loader";
import { GalleryHorizontalEnd, LandmarkIcon, MessageCircle, Pencil, Phone, Trash2, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../properties/component/Navbar";
import { fetchLeads } from './action';
import { isLoggedIn, removeToken } from "@/utils/auth";
import Link from "next/link";

interface Plot {
  _id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  address: string;
  status: string;
}

interface DashboardData {
  plot: Plot[];
  PlotCount: number;
  UsersCount: number;
  totalValue: number;
}

interface Lead {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  date?: string;
  time?: string;
}

export default function AdminPropertyDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Lead[] | null>(null);

  const [dataFrame, setDataFrame] = useState<DashboardData>({
    plot: [],
    PlotCount: 0,
    UsersCount: 0,
    totalValue: 0,
  });

  // Separation of loading states to prevent blocking the initial page draw
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [actionLoader, setActionLoader] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleOpenModal = async () => {
    setIsOpen(true);
    setActionLoader(true);
    try {
      const data = await fetchLeads();
      setModalData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoader(false);
    }
  };

  const fetchData = async (isFirstMount = false) => {
    try {
      if (!isFirstMount) setActionLoader(true);
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDataFrame(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setInitialLoading(false);
      setActionLoader(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/auth/login');
      return;
    }
    // Prefetching target redirect locations so they open instantly later
    router.prefetch("/dashboard/addProperty");
    fetchData(true);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setActionLoader(true);
      const res = await fetch(`/api/dashboard?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        await fetchData(false);
      }
    } catch (error) {
      console.log(error);
      setActionLoader(false);
    }
  };

  const filteredPlots = dataFrame.plot.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.address?.toLowerCase().includes(query) ||
      item.status?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />
      {/* actionLoader handles mutations like delete/modal safely without wiping page UI */}
      {actionLoader && <Loader />}

      <section className="min-h-screen bg-[#F7F4F1] mt-15 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Admin Property Dashboard
              </h1>
              <p className="text-gray-600 mt-3">
                Manage and track your land listings across India with real-time status updates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">

              <Link
                href="/dashboard/addImage"
                className="w-full sm:w-auto flex items-center justify-center gap-2 
               bg-[#A86300] text-white 
               px-5 sm:px-6 py-3 sm:py-4 
               rounded-xl shadow-md 
               font-medium 
               transition-all duration-200 
               hover:bg-[#8a5200] hover:shadow-lg active:scale-95"
              >
                ＋ New Image
              </Link>

              <Link
                href="/dashboard/addProperty"
                className="w-full sm:w-auto flex items-center justify-center gap-2 
               bg-[#A86300] text-white 
               px-5 sm:px-6 py-3 sm:py-4 
               rounded-xl shadow-md 
               font-medium 
               transition-all duration-200 
               hover:bg-[#8a5200] hover:shadow-lg active:scale-95"
              >
                ＋ Add Property
              </Link>

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 
               bg-red-600 text-white 
               px-5 sm:px-6 py-3 sm:py-4 
               rounded-xl shadow-md 
               font-medium 
               transition-all duration-200 
               hover:bg-red-700 hover:shadow-lg active:scale-95"
                onClick={() => {
                  removeToken()
                  router.replace('/');
                }}
              >
                Logout
              </button>

            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="bg-white rounded-3xl shadow-sm p-4 mt-10">
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Listings by name, location, or status..."
                className="flex-1 border border-[#DDBEA2] rounded-2xl px-6 py-5 outline-none"
              />
              <button className="border border-[#DDBEA2] rounded-2xl px-10 py-5 bg-[#FAF7F4] hover:bg-gray-100 font-medium transition">
                Filter
              </button>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden mt-8">
            <div className="hidden md:grid grid-cols-5 px-8 py-6 bg-[#FAF7F4] font-semibold">
              <div>PROPERTY NAME</div>
              <div>PRICE</div>
              <div>LOCATION</div>
              <div>STATUS</div>
              <div>ACTIONS</div>
            </div>

            {initialLoading ? (
              /* Inline non-blocking loader specifically inside the list section container */
              <div className="p-20 text-center text-gray-500 font-medium">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-[#A86300] border-t-transparent rounded-full animate-spin"></div>
                  <span>Fetching current property directory listings...</span>
                </div>
              </div>
            ) : filteredPlots.length > 0 ? (
              filteredPlots.map((item, index) => (
                <div
                  key={item._id || index}
                  className="grid md:grid-cols-5 gap-6 px-8 py-8 border-t items-center animate-fade-in"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.images[0] || "/placeholder.jpg"}
                      className="w-14 h-14 rounded-xl object-cover"
                      width={100}
                      height={100}
                      alt="image"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <div>{item.price}</div>
                  <div>📍 {item.address}</div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${item.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      ● {item.status}
                    </span>
                  </div>

                  <div className="flex gap-5 text-xl">
                    <button
                      title="edit"
                      className="cursor-pointer p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
                      onClick={() => router.push(`/dashboard/updateProperty/${item._id}/`)}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      title="delete"
                      className="cursor-pointer p-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500 border-t">
                No properties match your search criteria.
              </div>
            )}

            {/* FOOTER COUNTER */}
            <div className="flex flex-col lg:flex-row justify-between items-center px-8 py-6 border-t">
              <p className="text-sm text-gray-500">
                Showing {filteredPlots.length} of {dataFrame.PlotCount} Properties
              </p>
            </div>
          </div>

          {/* ANALYTICAL METRIC CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "TOTAL PORTFOLIO",
                value: initialLoading ? "..." : `${dataFrame.PlotCount} Plots`,
                Icon: GalleryHorizontalEnd,
                Action: () => console.log("none")
              },
              {
                title: "ACTIVE ENQUIRIES",
                value: initialLoading ? "..." : `${dataFrame.UsersCount} Leads`,
                Icon: TrendingUp,
                Action: handleOpenModal
              },
              {
                title: "VALUE LOCKED",
                value: initialLoading ? "..." : `₹${dataFrame.totalValue.toLocaleString('en-IN')}`,
                Icon: LandmarkIcon,
                Action: () => console.log("none")
              },
            ].map((card, index) => {
              const IconComponent = card.Icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
                  onClick={card.Action}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#F4EFE9] flex items-center justify-center">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{card.title}</p>
                      <h3 className="text-4xl font-bold mt-1">{card.value}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section >

      {/* LEADS ENQUIRY MODAL WITH DATA TABLE */}
      {
        isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 relative max-h-[85vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Active Lead Enquiries</h2>
                  <p className="text-sm text-gray-500 mt-1">Real-time interest recorded from investors</p>
                </div>
                <button
                  title="close"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-500 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto mt-4 flex-1 rounded-xl border border-gray-100">
                {modalData && modalData.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF7F4] text-xs font-bold text-gray-700 tracking-wider">
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">USER NAME</th>
                        <th className="px-6 py-4">PHONE NUMBER</th>
                        <th className="px-6 py-4 text-center">Call</th>
                        <th className="px-6 py-4 text-center">Whatsapp</th>
                        <th className="px-6 py-4 text-center">Date</th>
                        <th className="px-6 py-4 text-center">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                      {modalData.map((lead, idx) => (
                        <tr key={lead._id || idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-400 font-medium">{idx + 1}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{lead.name}</td>
                          <td className="px-6 py-4">
                            <a href={`tel:${lead.phone}`} className="text-[#A86300] font-medium hover:underline">
                              {lead.phone}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <a href={`tel:${lead.phone}`} className="inline-block p-2 hover:bg-amber-50 rounded-full text-[#A86300] transition">
                              <Phone size={18} />
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <a href={`https://wa.me/91${lead.phone}?text=Hello! How Can I help you ${lead.name}`} className="inline-block p-2 hover:bg-green-50 rounded-full text-green-600 transition">
                              <MessageCircle size={18} />
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {lead.date}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {lead.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-10 text-center text-gray-500">
                    {!actionLoader && "No dynamic active leads found at this time."}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t mt-4 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}