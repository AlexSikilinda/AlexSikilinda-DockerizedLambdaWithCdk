using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;

namespace DockerizedLambdaExample.Tests;

public class FunctionTest
{
    [Fact]
    public void TestToUpperFunction()
    {
        var function = new Function();
        var context = new TestLambdaContext();
        var result = function.FunctionHandler(context);

        Assert.Equal("Hellow World from Lambda Function!", result);
    }
}