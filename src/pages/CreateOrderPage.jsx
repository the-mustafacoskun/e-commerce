import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAddress,
  fetchCreditCards,
  fetchUserAddress,
} from "../store/actions/clientActions";
import { CircleAlert, Plus, Smartphone, Trash, UserRound } from "lucide-react";
import CheckBox from "../components/generalElements/CheckBox";
import { AddressForm } from "../components/CreateOrderComponents/AddressForm";
import SummaryBox from "../components/ShoppingCartComponents/SummaryBox";
import AddCreditCard from "../components/CreateOrderComponents/AddCreditCard";
import { MyCreditCard } from "../components/CreateOrderComponents/CreditCard";

function CreateOrderPage() {
  const dispatch = useDispatch();
  const userAddresses = useSelector((store) => store.client.addressList);

  // O an hangi sekmenin aktif olduğunu tutan state ("address" veya "payment")
  const [activeTab, setActiveTab] = useState("address");
  const [sameBillAddress, setSameBillAddress] = useState(false);
  const [newAddressIsOpen, setNewAddressIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const creditCards = useSelector((store) => store.client.creditCards);
  useEffect(() => {
    dispatch(fetchUserAddress());
    dispatch(fetchCreditCards());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="relative mx-10 mt-5 ">
        {/* Üst Sekmeler (Tab Menü) */}
        <div className="flex justify-center cursor-pointer  border border-gray-200 rounded-lg">
          {/* Adres Sekmesi */}
          <div
            onClick={() => setActiveTab("address")}
            className={`flex-1 p-4 transition-all ${
              activeTab === "address"
                ? "border-b-4 bg-white border-b-alert font-bold"
                : ""
            }`}
          >
            <h4>Adres Bilgileri</h4>
            <div className="p-4 shadow rounded">
              {userAddresses && userAddresses.length > 0 ? (
                <>
                  <h5 className="font-bold">{userAddresses[0].title}</h5>
                  <p>
                    {userAddresses[0].neighborhood}, {userAddresses[0].district}{" "}
                    / {userAddresses[0].city}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400">Adres yükleniyor...</p>
              )}
            </div>
          </div>

          {/* Ödeme Sekmesi */}
          <div
            onClick={() => setActiveTab("payment")}
            className={`flex-1 p-4 transition-all ${
              activeTab === "payment"
                ? "border-b-4 bg-white border-b-alert font-bold"
                : ""
            }`}
          >
            <h4>Ödeme Seçenekleri</h4>
          </div>
        </div>
        <div className="flex gap-2 mt-6 p-6 border border-gray-200 rounded-lg">
          <CircleAlert className=" text-light-text fill-alert -scale-y-100" />
          <p>
            Kurumsal fatıralı alışveriş yapmak için "Faturamı Aynı Adrese
            Gönder" tıkını kaldırın ve Fatura adresi olarak kayıtlı Kurumsal
            Fatura adresinizi seçin
          </p>
        </div>
        {/*değişen içerik*/}
        <div className="mt-6 p-6 border border-gray-200 rounded-lg">
          {activeTab === "address" && (
            <div>
              <div className="w-full flex-col flex">
                <div className=" ml-auto pr-2">
                  <CheckBox
                    text="Faturamı Aynı Adrese Gönder"
                    value={sameBillAddress}
                    setValue={setSameBillAddress}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Teslimat Adresi
                    </h3>
                    {/*onClick yeni adres*/}
                    <div
                      onClick={() => {
                        setEditingAddress(null);
                        setNewAddressIsOpen(!newAddressIsOpen);
                      }}
                      className="flex flex-col gap-2 justify-center items-center p-4 bg-gray-100 shadow rounded  min-h-30"
                    >
                      <Plus className="text-alert-text" strokeWidth={3} />
                      <h6 className="font-medium">Yeni Adres Ekle</h6>
                    </div>

                    {userAddresses.map((address) => {
                      return (
                        <div key={address.id}>
                          <div className="flex justify-between  m-2">
                            <div className="flex gap-2">
                              <input
                                className="hover:cursor-pointer"
                                type="radio"
                              />
                              <h5 className="font-bold">{address.title}</h5>
                            </div>
                            <button
                              onClick={() => {
                                setNewAddressIsOpen(!newAddressIsOpen);
                                setEditingAddress(address);
                              }}
                              className="border-b  border-b-black hover:scale-110 hover:cursor-pointer"
                            >
                              Düzenle
                            </button>
                          </div>

                          <div className="flex flex-col gap-4 p-4 bg-white shadow rounded min-h-25">
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                <UserRound
                                  className="fill-alert text-alert-text"
                                  strokeWidth={1}
                                />
                                <h6>
                                  {address.name} {address.surname}
                                </h6>
                              </div>
                              <div className="flex gap-2">
                                <Smartphone strokeWidth={0.75} />
                                <h6>{address.phone}</h6>
                              </div>
                            </div>
                            <div className="flex">
                              <p>
                                {address.neighborhood}, {address.district} /
                                {address.city}
                                <br />
                                {address.address}
                              </p>
                              <Trash
                                onClick={() =>
                                  dispatch(deleteUserAddress(address.id))
                                }
                                className="self-end w-5 h-5 ml-auto"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/*Fatura Adresi*/}
                  {!sameBillAddress && (
                    <div>
                      {/*onClick yeni adres*/}

                      <h3 className="text-lg font-semibold mb-3">
                        Fatura Adresi
                      </h3>
                      {userAddresses.map((address) => {
                        return (
                          <div key={address.id}>
                            <div className="flex justify-between  m-2">
                              <div className="flex gap-2">
                                <input
                                  className="hover:cursor-pointer"
                                  type="radio"
                                />
                                <h5 className="font-bold">{address.title}</h5>
                              </div>
                              <button
                                onClick={() => {
                                  setNewAddressIsOpen(!newAddressIsOpen);
                                  setEditingAddress(address);
                                }}
                                className="border-b  border-b-black hover:scale-110 hover:cursor-pointer"
                              >
                                Düzenle
                              </button>
                            </div>

                            <div className="flex flex-col gap-4 p-4 bg-white shadow rounded min-h-25">
                              <div className="flex justify-between">
                                <div className="flex gap-2">
                                  <UserRound
                                    className="fill-alert text-alert-text"
                                    strokeWidth={1}
                                  />
                                  <h6>
                                    {address.name} {address.surname}
                                  </h6>
                                </div>
                                <div className="flex gap-2">
                                  <Smartphone strokeWidth={0.75} />
                                  <h6>{address.phone}</h6>
                                </div>
                              </div>
                              <div className="flex">
                                <p>
                                  {address.neighborhood}, {address.district} /
                                  {address.city}
                                  <br />
                                  {address.address}
                                </p>
                                <Trash
                                  onClick={() =>
                                    dispatch(deleteUserAddress(address.id))
                                  }
                                  className="self-end w-5 h-5 ml-auto"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Ödeme Yöntemi Seçin
              </h3>
              <div className="p-4 bg-white shadow rounded">
                <AddCreditCard />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditCards.map((card) => (
                  <div key={card.card_no} className="max-w-100">
                    <MyCreditCard cardInfo={card} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {newAddressIsOpen && (
          <>
            {/* Arka Planı Gri Yapma */}
            <div
              className="fixed inset-0 bg-gray-400/50  z-10 transition-opacity"
              onClick={() => setNewAddressIsOpen(false)}
            />

            {/* Form */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <AddressForm
                setNewAddressIsOpen={setNewAddressIsOpen}
                newAddressIsOpen={newAddressIsOpen}
                editingAddress={editingAddress}
              />
            </div>
          </>
        )}
      </div>
      <SummaryBox />
    </div>
  );
}

export default CreateOrderPage;
