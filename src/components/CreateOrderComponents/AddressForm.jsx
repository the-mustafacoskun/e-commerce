import { X } from "lucide-react";
import { useState } from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  postUserAddress,
  updateUserAddress,
} from "../../store/actions/clientActions";

export const AddressForm = ({
  setNewAddressIsOpen,
  newAddressIsOpen,
  editingAddress,
}) => {
  const [country, setCountry] = useState({
    id: 225,
    name: "Turkey",
    iso3: "TUR",
    iso2: "TR",
    phonecode: "90",
    currency: "TRY",
    latitude: "39.00000000",
    longitude: "35.00000000",
  });
  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    // 2. ADIM: Kalan temiz rakamları maske formatına diz
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return `(${phoneNumber}`;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneNumberLength < 9) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
  };
  const dispatch = useDispatch();
  const [state, setState] = useState(
    editingAddress?.city ? { name: editingAddress.city } : null,
  );

  // İlçe state'i için başlangıç değerini doğrudan editingAddress'ten türetiyoruz
  const [city, setCity] = useState(
    editingAddress?.district ? { name: editingAddress.district } : null,
  );
  const submitFn = (data) => {
    const formatedPhone = !data.phone.startsWith(0)
      ? "0" + data.phone.replace(/[^\d]/g, "")
      : data.phone;
    const apiPayload = {
      id: editingAddress?.id,
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: formatedPhone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood,
      address: data.address,
    };
    if (editingAddress && editingAddress.id) {
      dispatch(updateUserAddress(apiPayload));
      setNewAddressIsOpen(!newAddressIsOpen)
    } else {
      dispatch(postUserAddress(apiPayload));
      setNewAddressIsOpen(!newAddressIsOpen)
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
  defaultValues: editingAddress
    ? {
        ...editingAddress,
        phone: editingAddress.phone?.startsWith("0")
          ? editingAddress.phone.slice(1) // Başındaki 0'ı kırpıp forma verir
          : editingAddress.phone,
      }
    : {},
});
  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      className="flex flex-col gap-4 w-155 min-w-auto bg-white rounded-lg p-6"
    >
      <div className="flex justify-between">
        <h5 className="border-b border-b-gray-100 pb-4">Adres ekle</h5>
        <X
          onClick={() => {
            
            setNewAddressIsOpen(!newAddressIsOpen)}}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Adres Başlığı *</label>
        <input
          id="title"
          {...register("title", {
            required: "Adres Başlığı Zorunludur",
          })}
          placeholder="Adres Başlığını Giriniz"
          className=" p-2 border   border-gray-300 rounded text-gray-500  font-medium shadow-sm focus:outline-none"
        />
      </div>
      <div className="flex  justify-between gap-4 ">
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="name">Ad *</label>
          <input
            id="name"
            placeholder="Adınızı giriniz"
            {...register("name")}
            className="border p-2 rounded-lg border-gray-200"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="surname">Soyad *</label>
          <input
            id="surname"
            placeholder="Soyadınızı giriniz"
            {...register("surname")}
            className=" p-2 rounded-lg border border-gray-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="phone">Telefon *</label>
        <div className="flex gap-4">
          <input
            type="text"
            value={country?.phonecode ? `+${country.phonecode}` : ""}
            readOnly
            className="w-40 p-2 border pl-5 border-gray-300 rounded bg-gray-200 text-gray-500  font-medium shadow-sm focus:outline-none"
          />
          <input
            id="phone"
            type="text"
            {...register("phone", {
              required: "Numara gereklidir",
            })}
            placeholder="(___) ___ __ __"
            onChange={(e) => {
              e.target.value = formatPhoneNumber(e.target.value);
            }}
            className=" p-2 border flex-1 border-gray-300 rounded text-gray-500  font-medium shadow-sm focus:outline-none"
          />
        </div>
      </div>
      {/*il ilçe useForm eklemeyi unutma*/}
      <div className="flex flex-col gap-4">
        <div className="flex  gap-4 ">
          <div className="hidden">
            <label className="block  mb-1 font-medium">Ülke</label>
            <CountrySelect
              onChange={(val) => {
                setCountry(val);
                setState(null); // Ülke değişirse ili sıfırla
                setCity(null); // Ülke değişirse ilçeyi sıfırla
              }}
              value={country}
              placeHolder="Ülke Seçin"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">İl *</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "İl seçimi zorunludur" }}
              render={({ field }) => (
                <StateSelect
                  countryid={country?.id}
                  onChange={(val) => {
                    setState(val);
                    setCity(null);
                    field.onChange(val?.name);
                  }}
                  value={state}
                  placeHolder="İl Seçin"
                />
              )}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">İlçe *</label>
            <Controller
              name="district"
              control={control}
              rules={{ required: "İlçe seçimi zorunludur" }}
              render={({ field }) => (
                <CitySelect
                  key={state?.id ? state.id : "empty-city"}
                  countryid={country?.id}
                  stateid={state?.id}
                  onChange={(val) => {
                    setCity(val);
                    field.onChange(val?.name);
                  }}
                  value={city ? city : null}
                  placeHolder="İlçe Seçin"
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="neighborhood">Mahalle *</label>
          <input
            id="neighborhood"
            {...register("neighborhood", {
              required: "Mahalle gereklidir",
            })}
            placeholder="Mahalle Adı Giriniz"
            className=" p-2 border   border-gray-300 rounded text-gray-500  font-medium shadow-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Adres *</label>
          <textarea
            id="address"
            {...register("address", {
              required: "Adres gereklidir",
            })}
            placeholder="Cadde,sokak ve diğer bilgileri giriniz."
            className=" p-2 border  resize-none border-gray-300 rounded text-gray-500  font-medium shadow-sm focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          type="button"
          onClick={() => setNewAddressIsOpen(!newAddressIsOpen)}
          className={`${isValid ? "bg-alert" : "bg-gray-400"} p-3 text-white rounded-lg flex-1`}
        >
          Vazgeç
        </button>
        <button
          
          className={`${isValid ? "bg-alert" : "bg-gray-400"} p-3 text-white rounded-lg flex-1`}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};
