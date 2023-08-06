import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { RiDeleteBin5Line } from "react-icons/ri"
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

const ConfirmModal = () => {
   const { bookId } = useParams();
   const { _id:userId} = useAppSelector( state => state.user.user)

   const handleConfirm = () => {
    
   }

    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-4 py-2 bg-red-500 text-white rounded-md" variant="outline"><RiDeleteBin5Line /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-4 py-2 bg-red-500 hover:bg-red-500 text-white rounded-md">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default ConfirmModal;