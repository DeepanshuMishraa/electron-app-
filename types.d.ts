type Statistics = {
  cpu: {
    total: number;
    usage: number;
  };
  mem: {
    total: number;
    usage: number;
  };
  disk: {
    total: number;
    usage: number;
  };
};


type StaticData = {
  cpu: {
    total: number;
    usage: number;
  };
  mem: {
    total: number;
    usage: number;
  };
  disk: {
    total: number;
    usage: number;
  };
};

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  }
}
