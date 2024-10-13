import Container from "./Container";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
