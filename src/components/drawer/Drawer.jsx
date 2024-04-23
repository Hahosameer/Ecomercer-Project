import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AlignItemsList from "../cartList/CartList";

export default function AnchorTemporaryDrawer({
  open,
  setOpen,
  cartData,
  updateQty,
  deleteCart,
}) {
  return (
    <React.Fragment>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <AlignItemsList
          updateQty={updateQty}
          deleteCart={deleteCart}
          cartData={cartData}
        />
      </Drawer>
    </React.Fragment>
  );
}
