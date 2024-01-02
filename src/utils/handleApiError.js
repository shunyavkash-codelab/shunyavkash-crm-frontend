export default function handleApiError(error, setSnack) {
  let message = "Something went wrong! Please try again later.";
  console.log(error);
  if (error?.response?.data?.message) {
    message = error.response.data.message;
  }
  setSnack(message, "error");
}
