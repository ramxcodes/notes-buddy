export default function TagError() {
  return (
    <div className="text-2xl">
      <p>
        You may have selected <b>Two or more subjects</b>.
      </p>
      <br />
      <div className="text-muted-foreground text-lg">
        Please use the following approach:
        <ul>
          <li>
            <b>Single Subject</b>: You can select only one subject at a time.
          </li>
          <li>
            <b>Single Degree</b>: You can select only one degree at a time.
          </li>
        </ul>
      </div>
    </div>
  );
}
