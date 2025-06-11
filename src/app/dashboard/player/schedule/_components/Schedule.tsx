"use client";
import { generateTimeSlots } from "@/app/utils/generateTimeSlot";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import Link from "next/link";

export default function Schedule({ isOpen, onOpenChange, availableSlots }: { isOpen: boolean; onOpenChange: () => void; availableSlots: string[] }) {
  const timeSlots = generateTimeSlots(10, 24);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Jadwal Lapangan</ModalHeader>
            <ModalBody>
              <div className='space-y-2'>
                <div className='grid grid-cols-4 gap-4'>
                  {timeSlots.map((time, index) => {
                    const isAvailable = availableSlots.includes(time);
                    return (
                      <div key={index} className={`${isAvailable ? "bg-gray-50" : "bg-primary text-white"} shadow-sm p-2 rounded-xl text-center`}>
                        {time}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p>Keterangan:</p>
                  <div className='flex gap-2 items-center'>
                    <div className='bg-primary w-4 h-4'></div>
                    <p>Sudah Dibooking</p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Link href='/dashboard/player/booking'>
                <Button color='primary' onPress={onClose}>
                  Booking
                </Button>
              </Link>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
