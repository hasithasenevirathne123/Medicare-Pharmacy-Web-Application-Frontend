import React from "react";
import ContainerForm from "../../../components/ContainerForm/ContainerForm";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import File from "../../../assets/images/fileIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { savePrescriptionFile } from "../../../services/customerService";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { showAlertMessage } from "../../../app/alertMessageController";

const frequencyOptions = [
    { label: 'One Time', value: 'One Time' },
    { label: 'On Going', value: 'On Going' }, 
  ];

const fulfilmentOptions = [
    { label: 'Full', value: 'Full' },
    { label: 'Partial', value: 'Partial' }, 
  ];

const substitutesOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }, 
  ];

const paymentOptions = [
    { label: 'Card', value: 'Card' },
    { label: 'Cash', value: 'Cash' },
    
  ];
const refundOptions = [
    { label: 'Cash', value: 'Cash' },
    { label: 'In-Store-Credit', value: 'In-Store-Credit' },
    
  ];

const UploadPrescriptions = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const navigate = useNavigate();

  const savePrescription = async (data) => {
    console.log(data);
    const form = {
       customerId:1,
      frequency: data.frequency.value,
      fulfilment: data.fulfilment.value,
      substitutes: data.substitutes.value,
      prescriptionItem: data.prescriptionItem,
      file: data.file,
      paymentMethod: data.paymentMethod.value,
      refund: data.refund.value,
      shippingAddress:data.shippingAddress
    };
    console.log("form", form);
    const response = await savePrescriptionFile(form);
    console.log("Prescription", response);
    if (response && response.responseCode === 1000) {
      // navigate("/user/prescription");
      showAlertMessage({
        message:"Prescription saved",
        type:"success",
      });
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <div style={{ padding: 10 }}>
      <ContainerForm>
        <Typography sx={{ color: "#00000", mt: 1 }} variant="h5">
          Prescription Upload
        </Typography>
        <Divider sx={{ my: 1, width: "40%" }} />
        <Typography sx={{ color: "#616161", mt: 1 }} variant="p">
          * Please upload an image of your medical prescription issued by a SLMC
          registered doctor.
        </Typography>
        <Typography sx={{ color: "#616161", mt: 1 }} variant="p">
          * Prescription drugs will only be issued if a valid prescription image
          is provided.
        </Typography>

        <form onSubmit={handleSubmit(savePrescription)}>
          <Grid container spacing={1} rowGap={1} mt={1}>
            {/*  Frequency field */}
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Frequency <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Controller
                name="frequency"
                control={control}
                defaultValue={{ label: 'One Time', value: 'One Time' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="outlined-basic"
                    options={frequencyOptions}
                    // defaultValue="One Time"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} name="frequency" variant="outlined" />}
                    fullWidth
                    value={value}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                )}
              />
            </Grid>

            {/*  Fulfilment field */}
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Fulfilment <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Controller
                name="fulfilment"
                control={control}
                defaultValue={{ label: 'Full', value: 'Full' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="outlined-basic"
                    options={fulfilmentOptions}
                    // defaultValue="One Time"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} name="frequency" variant="outlined" />}
                    fullWidth
                    value={value}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                )}
              />


              {/* <Autocomplete
                id="outlined-basic"
                options={["Full", "Partial"]}
                defaultValue="Full"
                renderInput={(params) => (
                  <TextField {...params} name="fulfilment" variant="outlined" />
                )}
                fullWidth
              /> */}
            </Grid>

            {/*  ok field */}
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                I am Ok to recive Substitutes{" "}
                <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Controller
                name="substitutes"
                control={control}
                defaultValue={{ label: 'Yes', value: 'Yes' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="outlined-basic"
                    options={substitutesOptions}
                    // defaultValue="One Time"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} name="frequency" variant="outlined" />}
                    fullWidth
                    value={value}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                )}
              />
              {/* <Autocomplete
                id="outlined-basic"
                options={["Yes", "No"]}
                defaultValue="No"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="substitutes"
                    variant="outlined"
                  />
                )}
                fullWidth
              /> */}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Enter the prescription items and qty. Eg : Crestor 5mg – 10 Qty
                / Crestor 10mg – 10 Qty{" "}
                <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                {...register("prescriptionItem")}
                control={control}
                id="outlined-multiline-static"
                multiline
                rows={5}
                name="prescriptionItem"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Upload Prescription file{" "}
                <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type="file" />
              </Button>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img src={File} alt="" />
                <h4>file</h4>
              </div>
            </Grid>

            {/*  Fulfilment field */}
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Payment Options <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Controller
                name="paymentMethod"
                control={control}
                defaultValue={ { label: 'Card', value: 'Card' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="outlined-basic"
                    options={paymentOptions}
                    // defaultValue="One Time"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} name="frequency" variant="outlined" />}
                    fullWidth
                    value={value}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                )}
              />
              {/* <Autocomplete
                id="outlined-basic"
                options={["Card Payment"]}
                defaultValue="Full"
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                fullWidth
              /> */}
            </Grid>

            {/*  Fulfilment field */}
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                I prefer receiving any refunds as{" "}
                <span style={{ color: "#0070C0" }}>*</span>
              </Typography>
              <Controller
                name="refund"
                control={control}
                defaultValue={{ label: 'Cash', value: 'Cash' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="outlined-basic"
                    options={refundOptions}
                    // defaultValue="One Time"
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} name="frequency" variant="outlined" />}
                    fullWidth
                    value={value}
                    renderInput={(params) => (
                      <TextField {...params} />
                    )}
                  />
                )}
              />
              {/* <Autocomplete
                id="outlined-basic"
                options={["Cash", "in-Store-Credit"]}
                defaultValue="Full"
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
                fullWidth
              /> */}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "13px",
                    md: "13px",
                    lg: "13px",
                    xl: "15px",
                  },
                }}
                fontWeight={600}
              >
                Default Shipping Address{" "}
                <span style={{ color: "#0070C0" }}>*</span>
              </Typography>

               <Controller
                name="shippingAddress"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={1}
                  />
                )}
              />
              {/* <TextField
                fullWidth
               // id="outlined-multiline-static"
                multiline
                rows={1}
                {...register}
                control={control}
                name="shippingAddress"
                defaultValue={
                  "56/1/A,Malwaththa Road,Mullegama,Kaluthara,0123456789"
                }
              /> */}
            </Grid>

            {/* Submit btn */}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"end"}
            >
              {/* <Link to={'/user/prescription'}> */}
              <Button
                variant="contained"
                type="submit"
                disableElevation
                sx={{
                  "&:hover": {
                    backgroundColor: "#1976d2", // Primary color
                  },
                }}
              >
                Save Changes
              </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </ContainerForm>
    </div>
  );
};

export default UploadPrescriptions;
