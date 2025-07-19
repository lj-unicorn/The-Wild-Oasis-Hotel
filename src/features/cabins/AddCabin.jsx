import Button from "@/ui/Button.jsx";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";

import React from "react";
import Modal from "@/ui/Modal.jsx";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        {isOpenModal ? "Hide Form " : "Add New Cabin"}
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
