import { storage, db } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";

export const calculateDistance = (loc1, loc2) => {
  //Distance in km
  const [
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 },
  ] = [loc1, loc2];

  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var [radlat1, radlat2] = [(Math.PI * lat1) / 180, (Math.PI * lat2) / 180];
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    //dist = dist * 1.609344; include for km, remove for miles
    return dist.toFixed(2);
  }
};

export const setLocation = async (postcode) => {
  try {
    const coords = await Location.geocodeAsync(`${postcode}`);
    return {
      longitude: coords[0].longitude,
      latitude: coords[0].latitude,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getUserDataFromUid = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const fields = docSnap.data();
    return fields;
  } catch (err) {
    throw err;
  }
};

// const requests = await getDocs(collection(db, "requests"));
// requests.forEach((notDoc) =>
//   updateDoc(doc(db, "requests", notDoc.id), {
//     requestUid: notDoc.id,
//   })
// );

// export const updateItemLocationFormat = async () => {
//   const docs = await getDocs(collection(db, "items"));
//   docs.forEach((docco) => {
//     const userData = docco.data();
//     userData.userInfo.userLocation = {
//       latitude:
//         userData.userInfo.userLocation.mapValue.fields.latitude.doubleValue,
//       longitude:
//         userData.userInfo.userLocation.mapValue.fields.longitude.doubleValue,
//     };
//     console.log(userData.userInfo, ">>>>>>>>>>>>>>");
//     updateDoc(doc(db, "items", docco.id), { userInfo: userData.userInfo });
//   });
// };
