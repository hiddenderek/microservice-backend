CREATE TABLE IF NOT EXISTS public.test_table (
    test_id uuid NOT NULL,
    test_value text NOT NULL,
    wow_factor text,
    CONSTRAINT test_id_pkey PRIMARY KEY (test_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;