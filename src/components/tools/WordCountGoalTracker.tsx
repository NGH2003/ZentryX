
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Target, Trophy, Clock, RotateCcw } from "lucide-react";

const WordCountGoalTracker = () => {
  const [text, setText] = useState("");
  const [dailyGoal, setDailyGoal] = useState(500);
  const [projectGoal, setProjectGoal] = useState(10000);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [projectProgress, setProjectProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const { toast } = useToast();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime) {
      interval = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const startSession = () => {
    setStartTime(new Date());
    setSessionTime(0);
    toast({
      title: "Session Started",
      description: "Writing session timer started. Happy writing!"
    });
  };

  const endSession = () => {
    if (startTime) {
      setDailyProgress(prev => prev + wordCount);
      setProjectProgress(prev => prev + wordCount);
      setText("");
      setStartTime(null);
      setSessionTime(0);
      
      toast({
        title: "Session Completed",
        description: `Added ${wordCount} words to your progress!`
      });
    }
  };

  const resetProgress = () => {
    setDailyProgress(0);
    setProjectProgress(0);
    setText("");
    setStartTime(null);
    setSessionTime(0);
    
    toast({
      title: "Progress Reset",
      description: "All progress has been reset"
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const dailyPercentage = Math.min((dailyProgress / dailyGoal) * 100, 100);
  const projectPercentage = Math.min((projectProgress / projectGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Goal Settings */}
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Writing Goals</CardTitle>
          <CardDescription>
            Set and track your daily and project writing goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Goal (words)</label>
              <Input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Goal (words)</label>
              <Input
                type="number"
                value={projectGoal}
                onChange={(e) => setProjectGoal(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Daily Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{dailyProgress}</div>
              <div className="text-sm text-gray-600">of {dailyGoal} words</div>
            </div>
            <Progress value={dailyPercentage} className="h-3" />
            <div className="text-center text-sm text-gray-600">
              {dailyPercentage.toFixed(1)}% complete
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{projectProgress}</div>
              <div className="text-sm text-gray-600">of {projectGoal} words</div>
            </div>
            <Progress value={projectPercentage} className="h-3" />
            <div className="text-center text-sm text-gray-600">
              {projectPercentage.toFixed(1)}% complete
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Writing Session */}
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Writing Session</CardTitle>
          <CardDescription>
            Start a writing session and track your progress in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Session Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(sessionTime)}</span>
            </div>
            <div className="flex space-x-2">
              {!startTime ? (
                <Button onClick={startSession} className="bg-green-600 hover:bg-green-700">
                  Start Session
                </Button>
              ) : (
                <Button onClick={endSession} className="bg-blue-600 hover:bg-blue-700">
                  End Session
                </Button>
              )}
              <Button variant="outline" onClick={resetProgress}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Writing Area */}
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing here... Your word count will be tracked automatically."
            className="min-h-64"
          />

          {/* Current Session Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{wordCount}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{characterCount}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{characterCountNoSpaces}</div>
              <div className="text-sm text-gray-600">Chars (no spaces)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCountGoalTracker;
