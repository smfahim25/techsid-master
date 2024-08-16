
interface Proposal {
    id: string;
    title: string;
    summary: string;
    author: string;
    status: 'active' | 'closed';
    endsIn: string;
  }
  
const sampleProposals = [
    {
      id: '1',
      title: 'Increase Supply and Borrow Caps for wETH',
      summary: 'This proposal asks for governance approval to increase the supply and borrow caps for wETH to improve liquidity.',
      author: 'aci.eth',
      status: 'active',
      endsIn: '1 day',
    },
    {
      id: '2',
      title: 'Onboard tBTC to Aave v3 on Ethereum',
      summary: 'This proposal aims to onboard Threshold Network’s tBTC to Aave v3 on Ethereum to provide more options for users.',
      author: 'XG17',
      status: 'active',
      endsIn: '5 hours',
    },
    {
      id: '3',
      title: 'Safety Module - Create GHO/USDC E-CLP Category',
      summary: 'Proposing the creation of a new GHO/USDC E-CLP category for the Safety Module to enhance security.',
      author: 'TokenLogic',
      status: 'closed',
      endsIn: 'ended 58 minutes ago',
    },
  ]

  export default sampleProposals;