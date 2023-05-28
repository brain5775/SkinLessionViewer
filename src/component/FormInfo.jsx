import {
  Typography,
  Container,
  Divider,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import axios from "axios";
import "../styles/formInfo.css";
import moment from "moment";

export default function FormInfo() {
  return (
    <Container maxWidth="lg" className="py-4">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">Document general information :</Typography>
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Type"
            className="customField"
            value={docTypeValue}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Category"
            className="customField"
            value={docCategoryValue}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Patient Name"
            className="customField"
            value={docSubject}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Patient Id"
            className="customField"
            value={docSubjectId}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Date"
            className="customField"
            value={formatDate(docDate)}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Physician"
            className="customField"
            value={physician}
            multiline
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Title"
            className="customField"
            value={docTitle}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Responsible hospital"
            className="customField"
            value={responsibleHospital}
          />
        </Grid>
      </Grid>
      <div className="my-5">
        <Divider
          flexItem
          sx={{ border: "1.5px solid rgba(0,0,0,0.3)" }}></Divider>
      </div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6">Image information :</Typography>
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Type"
            className="customField"
            value={imageType}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Category"
            className="customField"
            value={imageCategory}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Captured Date"
            className="customField"
            value={formatDate(capturedDate)}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            variant="outlined"
            size="small"
            disabled
            fullWidth
            label="Physician"
            className="customField"
            value={imageAuthor}
          />
        </Grid>
        <Grid xs={12}>
          <div className="flex items-center gap-3 border border-gray-800 rounded-lg p-3">
            <CardMedia
              component="img"
              sx={imgSize}
              image={attachFile[0].url}
              className="rounded-lg"
            />

            <TextField
              variant="outlined"
              size="small"
              disabled
              fullWidth
              label="Image Title"
              className="customField"
              value={attachTitle}
            />
          </div>
        </Grid>
        <Grid xs={12} className="flex justify-end">
          <Button variant="contained" sx={buttonStyle}>
            Create Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

const imgSize = { maxWidth: 350, maxHeight: 350 };

const buttonStyle = {
  backgroundColor: "rgba(0, 168, 232, 0.95)",
  ":hover": {
    backgroundColor: "rgba(0, 168, 232, 1)",
  },
};

const getBundle = async () => {
  const response = await axios.get(
    "http://203.64.84.32:9876/fhir/Bundle/1737",
    {
      headers: { Authorization: `Bearer randToken` },
    }
  );
  return response.data.entry;
};

const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD (HH:m)");
};

const docTypeValue = [];
const docCategoryValue = [];
let docSubject;
let docDate;
const physician = [];
let docTitle;
let responsibleHospital;
let docSubjectId;

const imageType = [];
const imageCategory = [];
let capturedDate;
const attachTitle = [];
const attachFile = [];
const imageAuthor = [];

const entries = await getBundle();
entries.forEach((entry) => {
  if (entry.resource.resourceType === "Composition") {
    entry.resource.type.coding.forEach((tp) => docTypeValue.push(tp.display));
    entry.resource.category.forEach((cat) =>
      cat.coding.forEach((cd) => docCategoryValue.push(cd.display))
    );
    docSubject = entry.resource.subject.display;
    docDate = entry.resource.date;
    entry.resource.author.forEach((aut) => physician.push(aut.display));
    docTitle = entry.resource.title;
    responsibleHospital = entry.resource.custodian.display;
  }
  if (entry.resource.resourceType === "Patient") {
    docSubjectId = entry.resource.id;
  }
  if (entry.resource.resourceType === "DocumentReference") {
    entry.resource.content.forEach((cont) => {
      const attach = cont.attachment;
      attachTitle.push(attach.title);
      attachFile.push({
        contentType: attach.contentType,
        url: attach.url,
      });
    });
    capturedDate = entry.resource.date;
    entry.resource.type.coding.forEach((cd) => imageType.push(cd.display));
    entry.resource.category.forEach((cat) =>
      cat.coding.forEach((cd) => imageCategory.push(cd.display))
    );
    entry.resource.author.forEach((aut) => imageAuthor.push(aut.display));
  }
});
