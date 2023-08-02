import "./index.css";
import { BiPlus } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { Popup } from "reactjs-popup";
import Cookies from "js-cookie";
import { useState } from "react";

const AddTransaction = () => {
  const userId = Cookies.get("user_id");
  const [transactionName, editTransactionName] = useState("");
  const [transactionType, editTransactionType] = useState("");
  const [category, editCategory] = useState("");
  const [amount, editAmount] = useState("");
  const [date, editDate] = useState("");
  const [errorMsg, editErrorMsg] = useState(false);
  const [error, editError] = useState("");

  const onChangeTrName = (event) => {
    editTransactionName(event.target.value);
  };
  const onChangeTrType = (event) => {
    editTransactionType(event.target.value);
  };
  const onChangeCategory = (event) => {
    editCategory(event.target.value);
  };
  const onChangeAmount = (event) => {
    editAmount(event.target.value);
  };
  const onChangeDate = (event) => {
    editDate(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (
      transactionName !== "" &&
      transactionType !== "" &&
      category !== "" &&
      amount !== "" &&
      date !== ""
    ) {
      editErrorMsg(false);
      if (transactionName.length < 30) {
        editErrorMsg(false);
        const parseAmount = parseInt(amount);
        const url =
          "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
        const transactionDetails = {
          name: transactionName,
          type: transactionType,
          category: category,
          amount: parseAmount,
          date: new Date(date),
          user_id: userId,
        };
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": userId,
          },
          body: JSON.stringify(transactionDetails),
        };
        await fetch(url, options);
        window.location.reload(true);
      } else {
        editErrorMsg(true);
        editError("*Transaction name should less Than 30 characters");
      }
    } else {
      editErrorMsg(true);
      editError("*Fill all the fields");
    }
  };
  return (
    <>
      {userId !== "3" && (
        <Popup
          modal
          trigger={
            <button className="add-transaction-button" type="button">
              <BiPlus className="plus-icon" />
              <p className="add-transaction-name">Add Transaction</p>
            </button>
          }
          className="popup-content"
          position="right center"
        >
          {(close) => (
            <form className="model" onSubmit={onSubmitForm}>
              <div className="overlay">
                <div className="modal-container">
                  <div className="close-button-heading-container">
                    <h2 className="popup-heading">Add Transaction</h2>
                    <button
                      className="close-btn"
                      type="button"
                      onClick={() => close()}
                    >
                      <GrFormClose size="20" />
                    </button>
                  </div>
                  <p className="p1">Lorem ipsum dolor sit amet, consectetur</p>
                  <div className="transaction-input-container">
                    <label
                      htmlFor="transaction-name"
                      className="transaction-lable"
                    >
                      Transaction Name
                    </label>
                    <input
                      id="transaction-name"
                      className="transaction-input"
                      type="text"
                      placeholder="Enter Name"
                      onChange={onChangeTrName}
                    />
                  </div>
                  <div className="transaction-input-container">
                    <label
                      htmlFor="transaction-type"
                      className="transaction-lable"
                    >
                      Transaction Type
                    </label>
                    <select
                      id="transaction-type"
                      className="transaction-input"
                      onChange={onChangeTrType}
                    >
                      <option disabled selected>
                        Select Transaction Type
                      </option>
                      <option value={"credit"}>Credit</option>
                      <option value={"debit"}>Debit</option>
                    </select>
                  </div>
                  <div className="transaction-input-container">
                    <label htmlFor="category" className="transaction-lable">
                      Category
                    </label>
                    <select
                      id="category"
                      className="transaction-input"
                      onChange={onChangeCategory}
                    >
                      <option disabled selected>
                        Select Category
                      </option>
                      <option>Entertainment</option>
                      <option>Food</option>
                      <option>Shopping</option>
                    </select>
                  </div>
                  <div className="transaction-input-container">
                    <label htmlFor="amount" className="transaction-lable">
                      Amount
                    </label>
                    <input
                      id="amount"
                      className="transaction-input"
                      type="number"
                      placeholder="Enter Name"
                      onChange={onChangeAmount}
                    />
                  </div>
                  <div className="transaction-input-container">
                    <label htmlFor="date" className="transaction-lable">
                      Date
                    </label>
                    <input
                      id="date"
                      className="transaction-input"
                      type="datetime-local"
                      placeholder="Enter Name"
                      onChange={onChangeDate}
                    />
                  </div>
                  {errorMsg && <p className="error">{error}</p>}
                  <button type="submit" className="Add-transaction-btn">
                    Add Transaction
                  </button>
                </div>
              </div>
            </form>
          )}
        </Popup>
      )}
    </>
  );
};
export default AddTransaction;
