function Field({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  placeholder = "",
  error,
  required = false,
  options,
}) {
  const inputId = `field-${name}`;

  return (
    <div className="form-field">
      <label htmlFor={inputId}>
        {label}

        {required && (
          <span className="required-mark">*</span>
        )}
      </label>

      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? "input-error" : ""}
        >
          <option value="">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "input-error" : ""}
        />
      )}

      {error && (
        <span className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;