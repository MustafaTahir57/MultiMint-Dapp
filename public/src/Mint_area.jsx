import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { mythicAbi, mythicAddress } from "./utils/mythicMonsters";
function Mint_area({ address }) {
  const web3 = new Web3(window.ethereum);
  const [ownerAddress, setOwnerAddress] = useState();
  const [mainLoading, setMainLoading] = useState(true);
  const [value, setValue] = useState();
  const [ownerSupply, setOwnerSupply] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [maxSupply, setMaxSupply] = useState();
  const [balanceOf, setBalanceOf] = useState();
  const [freeMintOpen, setFreeMintOpen] = useState();
  const [freelist, setFreelist] = useState();
  const [whitelist, setWhitelist] = useState();
  const [whitelistMintOpen, setWhitelistMintOpen] = useState();
  const [whitelistMintRate, setWhitelistMintRate] = useState();
  const [mintRate, setMintRate] = useState();
  const [publicMintOpen, setPublicMintOpen] = useState();
  const [error, SetError] = useState(false);
  const [loading, setLoading] = useState(false);
  const integrateContract = () => {
    const minting_Contract = new web3.eth.Contract(mythicAbi, mythicAddress);
    return minting_Contract;
  };
  const getDetails = async () => {
    try {
      if (address) {
        const contract = integrateContract();
        const owner = await contract.methods.owner().call();
        setOwnerAddress(owner);
        const MAX_SUPPLY = await contract.methods.MAX_SUPPLY().call();
        setMaxSupply(parseInt(MAX_SUPPLY));
        const OWNER_SUPPLY = await contract.methods.OWNER_SUPPLY().call();
        setOwnerSupply(parseInt(OWNER_SUPPLY));
        const totalSupply = await contract.methods.totalSupply().call();
        setTotalSupply(parseInt(totalSupply));
        const balanceOf = await contract.methods.balanceOf(address).call();
        setBalanceOf(parseInt(balanceOf));
        const freeMintOpen = await contract.methods.freeMintOpen().call();
        setFreeMintOpen(freeMintOpen);
        const freelist = await contract.methods.freelist(address).call();
        setFreelist(freelist);
        const whitelist = await contract.methods.whitelist(address).call();
        setWhitelist(whitelist);
        const whitelistMintOpen = await contract.methods
          .whitelistMintOpen()
          .call();
        setWhitelistMintOpen(whitelistMintOpen);
        const whitelistMintRate = await contract.methods
          .whitelistMintRate()
          .call();
        setWhitelistMintRate(parseInt(whitelistMintRate));
        const mintRate = await contract.methods.mintRate().call();
        setMintRate(parseInt(mintRate));
        const publicMintOpen = await contract.methods.publicMintOpen().call();
        setPublicMintOpen(publicMintOpen);
        setMainLoading(false);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleOwnerMint = async () => {
    try {
      let contract = integrateContract();
      if (address) {
        let ownerMintOpen = await contract.methods.ownerMintOpen().call();
        if (ownerMintOpen) {
          if (!value) {
            SetError(true);
            return;
          }
          setLoading(true);
          if (totalSupply <= ownerSupply) {
            const ownerMint = await contract.methods
              .ownerMint(
                address,
                "https://api.npoint.io/b5acda3501a07520b08e",
                value.toString()
              )
              .send({
                from: address,
              });
            if (ownerMint) {
              setLoading(false);
              toast.success("Owner Minting successfully.");
              setValue("");
              getDetails()
            }
          } else {
            setLoading(false);
            toast.error("Owner supply is sold out.");
          }
        } else {
          toast.error("Owner minting is not open yet");
          setLoading(false);
        }
      } else {
        toast.error("Firstly Connect Metamask");
        setLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    }
  };

  const handlePublicMint = async () => {
    try {
      if (address) {
        const balance = await web3.eth.getBalance(address);
        let price = parseInt(balance) / 1e18;
        price = price.toFixed(2);
        if (!value) {
          SetError(true);
          return;
        }
        setLoading(true);
        let contract = integrateContract();
        if (publicMintOpen) {
          if (totalSupply <= maxSupply) {
            if (value <= price) {
              const calcPrice = value * mintRate;
              const publicMint = await contract.methods
                .publicMint(
                  address,
                  "https://api.npoint.io/b5acda3501a07520b08e",
                  value.toString()
                )
                .send({
                  from: address,
                  value: calcPrice,
                });
              if (publicMint) {
                toast.success("Public minting successfully");
                setLoading(false);
                setValue("");
                getDetails()
              }
            } else {
              setLoading(false);
              toast.error(
                "Your entered amount is greater than your current amount."
              );
            }
          } else {
            setLoading(false);
            toast.error("Public supply is sold out.");
          }
        } else {
          toast.error("Public minting is not open yet");
          setLoading(false);
        }
      } else {
        toast.error("Firstly Connect Metamask");
        setLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    }
  };

  const handleWhiteListMint = async () => {
    try {
      if (address) {
        const balance = await web3.eth.getBalance(address);
        let price = parseInt(balance) / 1e18;
        price = price.toFixed(2);
        if (!value) {
          SetError(true);
          return;
        }
        setLoading(true);
        let contract = integrateContract();
        if (whitelistMintOpen) {
          if (value <= price) {
            const newPrice = value * whitelistMintRate;
            console.log("newPrice", newPrice);
            const whitelistMint = await contract.methods
              .whitelistMint(
                address,
                "https://api.npoint.io/b5acda3501a07520b08e",
                value.toString()
              )
              .send({
                from: address,
                value: newPrice,
              });
            if (whitelistMint) {
              toast.success("whitelist minting successfully");
              setLoading(false);
              setValue("");
              getDetails()
            }
          } else {
            setLoading(false);
            toast.error(
              "Your entered amount is greater than your current amount."
            );
          }
        } else {
          toast.error("Whitelist minting is not open yet");
          setLoading(false);
        }
      } else {
        toast.error("Firstly Connect Metamask");
        setLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    }
  };
  const handleFreeMint = async () => {
    try {
      if (address) {
        if (freeMintOpen) {
          setLoading(true);
          let contract = integrateContract();
          const freeMint = await contract.methods
            .freeMint(address, "https://api.npoint.io/b5acda3501a07520b08e")
            .send({
              from: address,
            });
          if (freeMint) {
            toast.success("Free minting successfully");
            setLoading(false);
            getDetails();
          }
        } else {
          toast.error("Free minting is not open yet");
          setLoading(false);
        }
      } else {
        toast.error("Firstly Connect Metamask");
        setLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetails();
  }, [address]);
  return (
    <div>
      <div className="text-white">
        <h3>
          Total Minted: {totalSupply}/{maxSupply}
        </h3>
      </div>
      {!mainLoading && (
        <>
          {balanceOf == 0 && freelist ? (
            <></>
          ) : (
            <>
              <p className="text-white p-0 m-0">Quantity</p>
              <input
                type="number"
                className="wid_inp"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min={0}
              />
            </>
          )}
        </>
      )}
      {error && !value && <p className="text-danger">Please fill input</p>}
      <div className="div mt-4">
        {!mainLoading && (
          <>
            {address == ownerAddress ? (
              <button
                className="btn  mb-4"
                onClick={handleOwnerMint}
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-2">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "OWNER MINT"
                )}
              </button>
            ) : balanceOf == 0 && freelist ? (
              <button
                className="btn  mb-4"
                onClick={handleFreeMint}
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-2">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "FREE MINT"
                )}
              </button>
            ) : whitelist ? (
              <button
                className="btn  mb-4"
                onClick={handleWhiteListMint}
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-2">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "WHITELIST MINT"
                )}
              </button>
            ) : (
              <button
                className="btn  mb-4"
                onClick={handlePublicMint}
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-2">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "PUBLIC MINT"
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Mint_area;
