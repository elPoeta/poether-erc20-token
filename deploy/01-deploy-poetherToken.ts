import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  networkConfig,
  developmentChains,
  SUPPLY,
  REWARD,
  CAP,
} from "../helper-hardhat-config";
import verify from "../verify";

const deployPoetherToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying PoetherToken and waiting for confirmations...");
  const poetherToken = await deploy("PoetherToken", {
    from: deployer,
    args: [SUPPLY, CAP, REWARD],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`PoetherToken at ${poetherToken.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(poetherToken.address, []);
  }
};

export default deployPoetherToken;
deployPoetherToken.tags = ["all", "poether"];
