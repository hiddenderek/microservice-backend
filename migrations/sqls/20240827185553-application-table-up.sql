CREATE TABLE IF NOT EXISTS public.application (
    application_id uuid NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    ssn text NOT NULL,
    total_loan_amount integer NOT NULL,
    num_credit_line integer NOT NULL,
    CONSTRAINT application_id PRIMARY KEY (application_id)
)