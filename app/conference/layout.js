import style from "./styles.css";

export default function ConferenceLayout({ children }) {
    return (
    <>
        <header style={style.header}>
            <h1>Conference Header for App</h1>
        </header>
        <section>{children}</section>
    </>
    );
  }