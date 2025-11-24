import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimerStopwatch = () => {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState("5");
  const [timerSeconds, setTimerSeconds] = useState("0");
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (stopwatchRunning) {
      interval = window.setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    let interval: number;
    if (timerRunning && timerTime > 0) {
      interval = window.setInterval(() => {
        setTimerTime(prev => {
          if (prev <= 10) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    const mins = parseInt(timerMinutes) || 0;
    const secs = parseInt(timerSeconds) || 0;
    setTimerTime((mins * 60 + secs) * 1000);
    setTimerRunning(true);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Timer & Stopwatch</CardTitle>
          <CardDescription>Track time with precision</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stopwatch">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
              <TabsTrigger value="timer">Timer</TabsTrigger>
            </TabsList>

            <TabsContent value="stopwatch" className="space-y-4">
              <div className="text-center">
                <p className="text-6xl font-bold font-mono mb-6">
                  {formatTime(stopwatchTime)}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setStopwatchRunning(!stopwatchRunning)}
                    size="lg"
                  >
                    {stopwatchRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    onClick={() => {
                      setStopwatchRunning(false);
                      setStopwatchTime(0);
                    }}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timer" className="space-y-4">
              <div className="text-center">
                <p className="text-6xl font-bold font-mono mb-6">
                  {formatTime(timerTime)}
                </p>

                {!timerRunning && timerTime === 0 && (
                  <div className="flex gap-4 justify-center mb-4">
                    <div>
                      <label className="block text-sm mb-1">Minutes</label>
                      <Input
                        type="number"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(e.target.value)}
                        className="w-24"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Seconds</label>
                      <Input
                        type="number"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(e.target.value)}
                        className="w-24"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-center">
                  {timerTime === 0 ? (
                    <Button onClick={startTimer} size="lg">
                      <Play className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setTimerRunning(!timerRunning)}
                      size="lg"
                    >
                      {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerTime(0);
                    }}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimerStopwatch;
