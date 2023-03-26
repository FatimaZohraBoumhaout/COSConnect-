--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user_profile; Type: TABLE; Schema: public; Owner: testuser
--

CREATE TABLE public.user_profile (
    user_id integer NOT NULL,
    pronouns character varying(20) NOT NULL,
    classes character varying(50) NOT NULL,
    bio character varying(100) NOT NULL,
    availability character varying(50),
    full_name character varying(50),
    display_name character varying(50)
);


ALTER TABLE public.user_profile OWNER TO testuser;

--
-- Name: user_profile_user_id_seq; Type: SEQUENCE; Schema: public; Owner: testuser
--

CREATE SEQUENCE public.user_profile_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_profile_user_id_seq OWNER TO testuser;

--
-- Name: user_profile_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testuser
--

ALTER SEQUENCE public.user_profile_user_id_seq OWNED BY public.user_profile.user_id;


--
-- Name: user_profile user_id; Type: DEFAULT; Schema: public; Owner: testuser
--

ALTER TABLE ONLY public.user_profile ALTER COLUMN user_id SET DEFAULT nextval('public.user_profile_user_id_seq'::regclass);


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: testuser
--

COPY public.user_profile (user_id, pronouns, classes, bio, availability, full_name, display_name) FROM stdin;
\.


--
-- Name: user_profile_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testuser
--

SELECT pg_catalog.setval('public.user_profile_user_id_seq', 1, false);


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: testuser
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

