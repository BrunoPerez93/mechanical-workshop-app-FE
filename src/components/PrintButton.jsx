

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="btn btn-light"
    >
      Imprimir
    </button>
  );
};

export default PrintButton;