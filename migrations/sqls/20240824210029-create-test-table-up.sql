DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mood') THEN
       CREATE TYPE mood AS ENUM ('happy', 'cool', 'coolio', 'cool beans');
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.test_table (
    test_id uuid NOT NULL,
    test_value text NOT NULL,
    wow_factor mood,
    CONSTRAINT test_id_pkey PRIMARY KEY (test_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;