import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        display: "flex",
        minHeight: 72,
        padding: 2,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 0,
        borderTopColor: "divider",
        borderTopWidth: 1,
        borderTopStyle: "solid",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        maxWidth={"lg"}
      >
        <Typography>
          {process.env.SITE_TITLE}
          {` © ${new Date().getFullYear()}`}
        </Typography>
        <Typography>
          built with ❤️ by{" "}
          <Link href="https://github.com/humanshield89">
            @humanshield89 | Rachid Boudjelida
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
