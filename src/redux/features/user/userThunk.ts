import { createAsyncThunk } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../../lib/firebase"


interface ICredentials {
    email: string
    password: string
    username?: string
  }

export const createUser = createAsyncThunk(
    "user/createUser",
    async ({ email, password, username }: ICredentials) => {
      try {
        const userData = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const user = userData.user
        await updateProfile(user, { displayName: username })
        const userInfoResponse = await fetch(
          "http://localhost:5002/api/v1/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              userId: user.uid,
              username: user.displayName,
              wishlist: [],
              readingList: [],
            }),
          },
        )
  
  
        if (!userInfoResponse.ok) {
          throw new Error("Failed to create user information")
        }
  
        const userInfo = await userInfoResponse.json()
        // Return both user and userInfo
        return userInfo.data
      } catch (error) {
        throw error
      }
    },
  )
  
  export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: ICredentials) => {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password)
        const userId = data.user.uid
  
        if (!userId) {
          throw new Error("Failed to create user information")
        }
        const userInfoResponse = await fetch(
          `http://localhost:5002/api/v1/auth/login/${userId}`,
        )
  
        const userInfo = await userInfoResponse.json()
  
        console.log(userInfo)
        // Return both user and userInfo
        return userInfo.data
      } catch (error) {
        throw error
      }
    },
  )
  
  export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (userId: string) => {
      const userInfoResponse = await fetch(
        `http://localhost:5002/api/v1/auth/login/${userId}`,
      )
  
      const userInfo = await userInfoResponse.json()
      if(userInfo.data.length === 0){
        return {
          email: null
        }
      }
      return userInfo.data
    }
    )
  
  export const addWishlist = createAsyncThunk(
    "user/addWishlist",
    async (data:{userId: string, userInfo: object}) => {
    console.log(data)
     try{
      const userInfoResponse = await fetch(
        `http://localhost:5002/api/v1/users/${data.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.userInfo),
        },
      )
      const userInfo = await userInfoResponse.json();
  
      return userInfo.data
     }catch(error){
  
     }
    }
  )
  export const addToReadList = createAsyncThunk(
    "user/addToReadList",
    async (data:{userId: string, userInfo: object}) => {
    console.log(data)
     try{
      const userInfoResponse = await fetch(
        `http://localhost:5002/api/v1/users/${data.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.userInfo),
        },
      )
      const userInfo = await userInfoResponse.json();
  
      return userInfo.data
     }catch(error){
  
     }
    }
  )