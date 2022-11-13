import { ConnectButton } from "@dailycodeltd/ermu";
import Box from "@mui/material/Box";
import Logo from "../../components/Logo";
import Container from "@mui/material/Container";

const Header = () => {
  return (
    <Box
      sx={{
        //backgroundColor: (theme) => theme.palette.background.paper + '11',
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth={"lg"} sx={{ display: "flex", p: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <ConnectButton
          sx={{ borderRadius: 6, p: 1, pl: 4, pr: 4, fontSize: "0.9em" }}
          color={"primary"}
          chainId={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
        />
      </Container>
    </Box>
  );
};

export default Header;
