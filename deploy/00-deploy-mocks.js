const { network, ethers } = require("hardhat")
const { developmentChain , networkConfig} = require("../helper-hardhat-config")

const BASE_FEE = ethers.parseEther("0.25") // 0.25 LINK 
const GAS_PRICE_LINK = 1e9 // link per gas

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deployer } = await getNamedAccounts() 
    const { deploy, log } = deployments

    const args = [BASE_FEE,GAS_PRICE_LINK]
    if(developmentChain.includes(network.name)){
        log("Local network detected")
        // deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock",{
            from:deployer,
            log:true,
            args:args
        })
        log("Mocks deployed")
        log("--------------------------------------------")
    }
}

module.exports.tags = ["all","mocks"]


// const { network } = require("hardhat")

// const BASE_FEE = ethers.utils.parseEther("0.25")  // 0.25 is this the premium in LINK?
// const GAS_PRICE_LINK = 1e9 // link per gas, is this the gas lane? // 0.000000001 LINK per gas

// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId
//     // If we are on a local development network, we need to deploy mocks!
//     if (chainId == 31337) {
//         log("Local network detected! Deploying mocks...")
//         await deploy("VRFCoordinatorV2Mock", {
//             from: deployer,
//             log: true,
//             args: [BASE_FEE, GAS_PRICE_LINK],
//         })

//         log("Mocks Deployed!")
//         log("----------------------------------------------------------")
//         log("You are deploying to a local network, you'll need a local network running to interact")
//         log(
//             "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
//         )
//         log("----------------------------------------------------------")
//     }
// }
// module.exports.tags = ["all", "mocks"]