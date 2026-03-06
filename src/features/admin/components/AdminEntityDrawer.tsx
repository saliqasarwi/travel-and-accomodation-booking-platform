import { useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { FormikProps } from "formik";

import type {
  CityFormValues,
  HotelFormValues,
  RoomFormValues,
} from "../types/admin.types";

import CityForm from "./forms/CityForm";
import HotelForm from "./forms/HotelForm";
import RoomForm from "./forms/RoomForm";

type Mode = "create" | "edit";

type Props =
  | {
      open: boolean;
      mode: Mode;
      entity: "cities";
      title: string;
      initialValues: CityFormValues;
      onClose: () => void;
      onSubmit: (values: CityFormValues) => Promise<void>;
      saving?: boolean;
    }
  | {
      open: boolean;
      mode: Mode;
      entity: "hotels";
      title: string;
      initialValues: HotelFormValues;
      onClose: () => void;
      onSubmit: (values: HotelFormValues) => Promise<void>;
      saving?: boolean;
    }
  | {
      open: boolean;
      mode: Mode;
      entity: "rooms";
      title: string;
      initialValues: RoomFormValues;
      onClose: () => void;
      onSubmit: (values: RoomFormValues) => Promise<void>;
      saving?: boolean;
    };

export default function AdminEntityDrawer(props: Props) {
  const { open, onClose, saving } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formikRef = useRef<FormikProps<any> | null>(null);

  const handleSaveClick = async () => {
    const formik = formikRef.current;
    if (!formik) {
      console.warn("[AdminEntityDrawer] formikRef is null (form not mounted?)");
      return;
    }

    // show errors even if fields not touched
    const allTouched = Object.keys(formik.values ?? {}).reduce<
      Record<string, boolean>
    >((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});

    formik.setTouched(allTouched, true);
    await formik.submitForm();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={saving ? undefined : onClose}
      hideBackdrop
      ModalProps={{
        keepMounted: true,
      }}
      slotProps={{
        paper: {
          sx: {
            width: 420,
            top: "64px", // AppBar height
            height: "calc(100% - 64px)",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ width: 420, p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6">{props.title}</Typography>
          </Box>

          <IconButton onClick={onClose} disabled={saving}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {props.entity === "cities" && (
          <CityForm
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            innerRef={formikRef}
          />
        )}

        {props.entity === "hotels" && (
          <HotelForm
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            innerRef={formikRef}
          />
        )}

        {props.entity === "rooms" && (
          <RoomForm
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            innerRef={formikRef}
          />
        )}

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} disabled={saving}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={saving}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
