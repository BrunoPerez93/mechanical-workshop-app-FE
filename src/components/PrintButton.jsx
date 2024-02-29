

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="btn btn-light m-2"
    >
      Imprimir
    </button>
  );
};

export default PrintButton;