import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Tag from "@/ui/Tag";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useBooking } from "./useBooking.js";
import Spinner from "@/ui/Spinner.jsx";
import Empty from "@/ui/Empty.jsx";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout.js";
import Modal from "@/ui/Modal.jsx";
import ConfirmDelete from "@/ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const { status, id: bookingId } = booking ?? {};
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => {
              navigate(`/checkin/${bookingId}`);
            }}>
            Check in
          </Button>
        )}

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button $variation="danger" disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: navigate(-1),
                });
              }}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => {
              checkout(bookingId);
            }}>
            Check out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
