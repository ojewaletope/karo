import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

import { Spinner } from "../components";

import { Geolocation, NewListing } from "../models/model";

import { toast } from "react-toastify";

export const Newlisting = () => {
  const [formData, setFormData] = useState<NewListing>({} as NewListing);
  const [geolocationEnabled, setGeolocation] = useState(true);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const {
    type,
    name,
    bedroom,
    bathroom,
    parking,
    furnished,
    location,
    offer,
    regularPrice,
    discountedPrice,
    imageUrls,
    latitude,
    longitude,
    images,
    address,
  } = formData;
  formData.name = "";
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/login");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const geoCodeApiKey = process.env.REACT_APP_GEOCODE_API_KEY;

    if (discountedPrice >= regularPrice) {
      return toast.error("Discounted price should be less than regular price");
    }

    if (images.length > 6) {
      return toast.error("Maximum of 6 images");
    }

    let geolocation: Geolocation = {};
    let location: string;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geoCodeApiKey}`
      );
      const data = await response.json();
      geolocation.latitude = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.longitude = data.results[0]?.geometry.location.lng ?? 0;
      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        return toast.error("Please enter a correct address");
      }
    } else {
      geolocation.latitude = latitude;
      geolocation.longitude = longitude;
      location = address;
    }
    console.log(formData);

    // setLoading(true);
  };

  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;

    const { id, value } = target;

    let boolean: boolean;

    // check for booleans
    if (target.value === "true") {
      boolean = true;
    }
    if (target.value === "false") {
      boolean = false;
    }

    // check for files
    if (target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: target.files!,
      }));
    }

    // text/numbers/booleans
    if (!target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: boolean ?? value,
      }));
    }

    // setFormData((prevState) => ({ ...prevState, [id]: value }));

    // console.log(formData);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create New Listing</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={handleChange}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={handleChange}
            >
              Rent
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            maxLength={32}
            minLength={10}
            required
          />

          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={bedroom}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={bathroom}
                onChange={handleChange}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              value={"true"}
              onClick={handleChange}
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="parking"
              value={"false"}
              onClick={handleChange}
            >
              No
            </button>
          </div>

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={"true"}
              onClick={handleChange}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={"false"}
              onClick={handleChange}
            >
              No
            </button>
          </div>

          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            id="address"
            value={address}
            onChange={handleChange}
            required
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="formLabel">Longitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={"true"}
              onClick={handleChange}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={"false"}
              onClick={handleChange}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={handleChange}
              min="50"
              max="750000000"
              required
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                className="formInputSmall"
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={handleChange}
                min="50"
                max="750000000"
                required={offer}
              />
            </>
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={handleChange}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button type="submit" className="primaryButton createListingButton">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};
